import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import { SITE } from '@/config';
import { HexColors } from '@/constants/colors';
import Font from '@/emails/font';
import Tailwind from '@/emails/tailwind';

type NewsletterConfirmationEmailProps = {
  email: string;
};

const NewsletterConfirmationEmail = ({
  email,
}: NewsletterConfirmationEmailProps) => {
  const previewText = "You're subscribed to the aSaaSin newsletter!";

  return (
    <Html>
      <Head>
        <Font />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-secondary-dark m-auto px-2 font-sans">
          <Container className="border-neutral mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid p-[20px] font-[Inter]">
            <Section className="mt-[32px] text-center">
              <Img
                src={`${SITE.url}/email/asaasin-logo.png`}
                width="138"
                height="22"
                alt="aSaaSin"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="text-primary-light mx-0 my-[30px] p-0 text-center text-[24px] font-bold">
              You’re subscribed! 🎉
            </Heading>
            <Text className="text-primary-light text-center text-[14px] leading-[24px]">
              Hi there,
            </Text>
            <Text className="text-primary-light mt-2 text-center text-[14px] leading-[24px]">
              Thanks for subscribing to the aSaaSin newsletter. You’ll now
              receive regular insights on startup ideas, fast launches, and
              building profitable SaaS products.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="bg-highlight text-primary-dark rounded-full px-5 py-3 text-center text-[12px] font-semibold no-underline"
                href={SITE.url}
              >
                Explore
              </Button>
            </Section>
            <Text className="text-primary-light text-center text-[14px] leading-[24px]">
              Got questions? Just reply to this email or visit our{' '}
              <Link href={SITE.url} className="text-highlight no-underline">
                website
              </Link>
              .
            </Text>
            <Hr
              className="my-[26px] w-full"
              style={{
                borderTop: `1px solid ${HexColors.neutral}`,
              }}
            />
            <Text className="text-neutral text-center text-[12px] leading-[24px]">
              This email was sent to{' '}
              <Link
                href={`mailto:${email}`}
                className="text-highlight no-underline"
              >
                {email}
              </Link>
              . If you didn’t subscribe to this newsletter, you can safely
              ignore this message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewsletterConfirmationEmail;
