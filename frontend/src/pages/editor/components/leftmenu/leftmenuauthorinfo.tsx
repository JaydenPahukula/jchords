import { useSignal } from '@preact/signals-react';
import { Box, Card, Flex, Skeleton, Text } from '@radix-ui/themes';
import { useEffect } from 'react';
import { UserInfo } from 'shared/types/userinfo';
import { Avatar } from 'src/components/ui/avatar';
import { apiGetUser } from 'src/functions/api/endpoints/getuser';

const emptyUserInfo: UserInfo = {
  displayName: null,
  photoURL: null,
};

interface LeftMenuAuthorInfoProps {
  id: string;
}

export function LeftMenuAuthorInfo(props: LeftMenuAuthorInfoProps) {
  const userInfo = useSignal<UserInfo | undefined | null>(undefined);

  const loading = userInfo.value === undefined;

  useEffect(() => {
    apiGetUser(props.id).then((result) => {
      userInfo.value = result;
    });
  }, [props.id]);

  return userInfo.value === null ? (
    <></>
  ) : (
    <Box mb="3">
      <Text>Author:</Text>
      <Card size="1">
        <Flex align="center" justify="start" gap="3">
          <Skeleton loading={loading}>
            <Avatar size="2" user={userInfo.value ?? emptyUserInfo} />
          </Skeleton>
          <Skeleton loading={loading}>
            <Text size="2">{userInfo.value?.displayName ?? 'Anonymous'}</Text>
          </Skeleton>
        </Flex>
      </Card>
    </Box>
  );
}
