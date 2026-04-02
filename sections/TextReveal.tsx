import Image from "next/image";

export default function TextReveal() {
  return (
    <section className="min-h-screen pt-20 ">
      <div className="flex justify-center items-center">
        <div>
            <img src="/images.jpeg" alt="features_1" />
        </div>
        <div>
          <h1>Text-Reveal animations</h1>
        </div>
      </div>
    </section>
  );
}
