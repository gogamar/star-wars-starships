const InfoRow = ({ label, value }) => (
  <p className="mt-4">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export default InfoRow;
