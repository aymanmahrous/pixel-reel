import { useState } from "react";

export default function EnhancePage() {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  async function enhanceImage() {
    if (!image) return;

    setLoading(true);
    setOutput(null);

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("https://api-inference.huggingface.co/models/caidas/swin2sr-classical-sr-x4-64", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_HF_API_KEY",
      },
      body: formData,
    });

    const blob = await res.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Image Enhancer</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={enhanceImage}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Processing..." : "Enhance Image"}
      </button>

      {output && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <img src={output} className="rounded shadow" />
          <a
            href={output}
            download="enhanced.png"
            className="block mt-4 px-4 py-2 bg-green-600 text-white rounded text-center"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
