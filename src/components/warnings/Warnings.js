import classes from "./Warnings.module.css";

const LEVEL_CONFIG = {
  red:    { label: "Vermelho", bg: "#c0392b", icon: "🔴" },
  orange: { label: "Laranja",  bg: "#e67e22", icon: "🟠" },
  yellow: { label: "Amarelo",  bg: "#d4a017", icon: "🟡" },
  green:  { label: "Verde",    bg: "#27ae60", icon: "🟢" },
};

const TYPE_ICON = {
  "Tempo Quente":         "🌡️",
  "Vento":               "💨",
  "Chuva":               "🌧️",
  "Neve":                "❄️",
  "Trovoada":            "⛈️",
  "Agitação Marítima":   "🌊",
  "Nevoeiro":            "🌫️",
  "Frio":                "🥶",
};

const formatTime = (iso) =>
  new Date(iso).toLocaleString("pt-pt", {
    day: "2-digit", month: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

const Warnings = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  // Sort: red first, then orange, then yellow
  const order = { red: 0, orange: 1, yellow: 2, green: 3 };
  const sorted = [...warnings].sort(
    (a, b) => (order[a.awarenessLevelID] ?? 9) - (order[b.awarenessLevelID] ?? 9)
  );

  return (
    <div className={classes.warnings_container}>
      {sorted.map((w, i) => {
        const cfg = LEVEL_CONFIG[w.awarenessLevelID] ?? LEVEL_CONFIG.yellow;
        const typeIcon = TYPE_ICON[w.awarenessTypeName] ?? "⚠️";
        return (
          <div
            key={i}
            className={classes.warning_card}
            style={{ borderLeftColor: cfg.bg }}
          >
            <div className={classes.warning_header}>
              <span className={classes.warning_icon}>{typeIcon}</span>
              <span className={classes.warning_type}>{w.awarenessTypeName}</span>
              <span
                className={classes.warning_badge}
                style={{ backgroundColor: cfg.bg }}
              >
                {cfg.icon} {cfg.label}
              </span>
            </div>
            <div className={classes.warning_text}>{w.text}</div>
            <div className={classes.warning_time}>
              {formatTime(w.startTime)} → {formatTime(w.endTime)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Warnings;
