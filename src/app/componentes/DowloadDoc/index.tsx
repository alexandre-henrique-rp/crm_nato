'use client';
import { Button } from "@chakra-ui/react";

interface DownloadDocProps {
  base64: string;
  name: string;
}

export const DownloadDoc = ({ base64, name }: DownloadDocProps) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {base64 && (
        <Button
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="lg"
          onClick={handleDownload}
        >
          Download {name}
        </Button>
      )}
      <Button
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="lg"
          onClick={handleDownload}
        >
          Download {name}
        </Button>
    </>
  );
}
