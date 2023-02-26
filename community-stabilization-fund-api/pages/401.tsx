import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom401 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/login');
  }, [router]);
  return <h1>401 - Unauthorized Page</h1>;
};

export default Custom401;
