import "./LetterGlitch.css";

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) {
  const layerDuration = Math.max(1, 7 - glitchSpeed / 15);
  const noiseDuration = Math.max(0.12, 0.6 - glitchSpeed / 120);

  return (
    <div className="letter-glitch">
      <div
        className={`letter-glitch-layer ${smooth ? "letter-glitch-smooth" : ""}`}
        style={{ animationDuration: `${layerDuration}s` }}
      />
      <div
        className="letter-glitch-noise"
        style={{ animationDuration: `${noiseDuration}s` }}
      />
      <div
        className={`letter-glitch-vignette ${centerVignette ? "center" : ""} ${outerVignette ? "outer" : ""}`}
      />
    </div>
  );
}
