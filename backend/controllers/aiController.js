const axios = require("axios");

const Complaint = require(
    "../models/Complaint"
);


exports.analyzeComplaint =
    async (req, res) => {

        try {

            // FETCH ALL COMPLAINTS
            const complaints =
                await Complaint.find();


            if (complaints.length === 0) {

                return res.status(400).json({
                    message:
                        "No complaints found"
                });

            }


            // FORMAT COMPLAINTS
            const complaintText =
                complaints.map((c, index) => `

Complaint ${index + 1}

Title: ${c.title}

Description: ${c.description}

Category: ${c.category}

Location: ${c.location}

Status: ${c.status}

`).join("\n");


            // AI PROMPT
            const prompt = `
You are an AI Complaint Management System.

Analyze ALL complaints carefully.

Find ONLY the MOST URGENT complaint.

Then provide:

1. Complaint title
2. Urgency priority
(Low / Medium / High / Critical)

3. Responsible department

4. Complaint summary

5. Professional automatic response

Return ONLY valid JSON.

Format:

{
  "title": "",
  "priority": "",
  "department": "",
  "summary": "",
  "autoResponse": ""
}

Complaints:

${complaintText}
`;


            // OPENROUTER REQUEST
            const response = await axios.post(

                "https://openrouter.ai/api/v1/chat/completions",

                {
                    model: "openai/gpt-3.5-turbo",

                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                },

                {
                    headers: {

                        Authorization:
                            `Bearer ${process.env.OPENROUTER_API_KEY}`,

                        "Content-Type":
                            "application/json"

                    }
                }

            );


            // AI RESPONSE
            const aiText =
                response.data.choices[0]
                    .message.content;


            // PARSE JSON
            let parsedResult;

            try {

                parsedResult =
                    JSON.parse(aiText);

            }

            catch {

                parsedResult = {
                    raw: aiText
                };

            }


            // SEND RESULT
            res.status(200).json(
                parsedResult
            );

        }

        catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            res.status(500).json({
                message:
                    "AI Analysis Failed"
            });

        }

    };