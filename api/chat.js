export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message,
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.[0]?.generated_text ||
      "今ちょっと混んでるかも…";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ reply: "無料AIが寝てる…" });
  }
}
