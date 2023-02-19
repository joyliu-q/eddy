import { Box, Center, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Typed from "typed.js";
import "./index.css";

export const LiveTranscript = () => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to <b style='color: #ED8936'>Joymart</b>, Bienvenido a <b style='color: #ED8936'>Joymart</b>, 欢迎来到<b style='color: #ED8936'>Joymart</b>, Bienvenue chez <b style='color: #ED8936'>Joymart</b>",
      ],
      typeSpeed: 50,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current! as string | Element, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current?.destroy();
    };
  }, []);

  useEffect(() => typed.current?.start(), []);
  return (
    <Center>
      <Flex>
        <Box
          className="blur-box"
          position={"absolute"}
          width={"50px"}
          height={10}
        />{" "}
        <Box
          overflow={"hidden"}
          style={{ width: 300, whiteSpace: "nowrap", direction: "rtl" }}
          textAlign="right"
          ref={el}
        ></Box>
      </Flex>
    </Center>
  );
};
