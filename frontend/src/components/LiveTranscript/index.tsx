import { Box, BoxProps, Center, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Typed from "typed.js";
import "./index.css";

export const LiveTranscript = ({
  transcript,
  ...props
}: BoxProps & {
  transcript: string;
}) => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [transcript],
      typeSpeed: 10,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current! as string | Element, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current?.destroy();
    };
  }, [transcript]);

  useEffect(() => typed.current?.start(), []);
  return (
    <Center {...props}>
      <Flex>
        {/* <Box
          className="blur-box"
          position={"absolute"}
          width={"50px"}
          height={10}
        />{" "} */}
        <Box
          overflow={"hidden"}
          style={{ width: 800, whiteSpace: "nowrap" }}
          textAlign="right"
          ref={el}
        ></Box>
      </Flex>
    </Center>
  );
};
