import { UpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";

const ScrollToggle = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop } = document.documentElement;
      setShow(scrollTop > 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <Button
      type='primary'
      shape='circle'
      icon={<UpOutlined />}
      onClick={handleClick}
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 1000,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default ScrollToggle;
