import { components } from "@/libs/api/schema/uam";
import { Avatar } from "@chakra-ui/react";

export default function ProfileAvatar({
  user
}: {
  user: components['schemas']['User']
}) {
  const name = `${user.first_name} ${user.last_name}`;
  return (
    <Avatar
      name={name}
      rounded={'md'}
      size={'xl'}
    />
  )
}