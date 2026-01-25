import { PageNotFoundAnimation } from '@/components/PageNotFoundAnimation';

export default function NotFound() {
  return (
    <>
      <title>404 – Page Not Found</title>
      <meta
        name="description"
        content="The page you are looking for does not exist."
      />

      <div className="flex h-[calc(100vh-192px)] max-w-screen-md flex-col items-center justify-center">
        <PageNotFoundAnimation />
      </div>
    </>
  );
}
