import { Container, Stack } from "@chakra-ui/react";
import Header from "@/components/organisms/Header";
import Main from "@/components/organisms/Main";

export default function index() {
  return (
    <Container maxW="container.xl" p="8">
      <Stack spacing="8">
        <Header />
        <Main />
      </Stack>
    </Container>
  );
}
