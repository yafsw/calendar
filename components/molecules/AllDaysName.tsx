import { Card, Center, Heading } from "@chakra-ui/react";
import { daysName } from "@/utils/constants";

export default function AllDaysName() {
  return (
    <>
      {daysName.map((item, index) => (
        <Card
          key={index}
          borderLeft={(index !== 0 && "none") || ""}
          variant="outline"
          borderRadius="0"
          w="100%"
        >
          <Center py="4">
            <Heading as="h3" fontSize="md" fontWeight="medium">
              {item}
            </Heading>
          </Center>
        </Card>
      ))}
    </>
  );
}
