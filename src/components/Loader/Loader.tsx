import styles from './Loader.module.css';

export default function Loader() {
  return (
    <svg
      className={styles.loader}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="200"
      height="200"
    >
      <g>
        <circle
          strokeLinecap="round"
          fill="none"
          strokeDasharray="50.26548245743669 50.26548245743669"
          stroke="#1a7dcd"
          strokeWidth="8"
          r="32"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
}
