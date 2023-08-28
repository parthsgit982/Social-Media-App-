import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      size={"sm"}
      mx={2}
      colorScheme={colorMode === "dark" ? "blue" : "gray"}
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeSwitch;
