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

type WaitlistEmailProps = {
  email: string;
};

const WaitlistConfirmationEmail = ({ email }: WaitlistEmailProps) => {
  const previewText = "You're on the waitlist for aSaaSin! 🚀";

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
              You&#39;re on the waitlist! 🎉
            </Heading>
            <Text className="text-primary-light text-center text-[14px] leading-[24px]">
              Hi there,
            </Text>
            <Text className="text-primary-light mt-2 text-center text-[14px] leading-[24px]">
              Thank you for joining the aSaaSin waitlist! 🚀 We’re excited to
              have you onboard. As soon as the aSaaSin Starter Kit is ready,
              you’ll be the first to know.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="bg-highlight text-primary-dark rounded-full px-5 py-3 text-center text-[12px] font-semibold no-underline"
                href={SITE.url}
              >
                Learn More
              </Button>
            </Section>
            <Text className="text-primary-light text-center text-[14px] leading-[24px]">
              Have questions? Feel free to reply to this email or visit our{' '}
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
              . If you didn’t sign up for this waitlist, you can safely ignore
              this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistConfirmationEmail;
