import { FC } from "react";

const Loading: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="loader" style={{ borderTopColor: "transparent" }}></div>
      {/* You can customize the loader or add a message here */}
      <p style={{ marginLeft: "10px" }}>Loading...</p>
    </div>
  );
};

export default Loading;
