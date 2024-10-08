export default function LoadingIndicator({ customClass }) {
  return (
    <div className={`d-flex justify-content-center ${customClass}`}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
