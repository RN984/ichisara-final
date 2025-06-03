import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <motion.h1 className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Reactで作る、あなたのためのWebサイト
        </motion.h1>
        <p className="mb-6">フリーランスWebエンジニア ◯◯です</p>
        <a href="#contact" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          お問い合わせはこちら
        </a>
      </section>

      {/* Service Section */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-semibold mb-4">提供サービス</h2>
        <ul className="list-disc pl-5">
          <li>Reactサイト制作</li>
          <li>Tailwindデザイン</li>
          <li>簡易アプリ制作</li>
        </ul>
        <h3 className="mt-4 font-semibold">技術スタック</h3>
        <p>React, Vite, Tailwind, Firebase</p>
      </section>

      {/* Works Section */}
      <section className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">実績</h2>
        <div>
          <img src="/demo-site.png" alt="Demo site" className="w-full max-w-md mb-2" />
          <p>デザイン・実装担当、React＋SWR使用</p>
          <a href="https://github.com/yourrepo" className="text-blue-600 underline">GitHubリンク</a>
        </div>
      </section>

      {/* Profile Section */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-semibold mb-4">プロフィール</h2>
        <p>デザインと実装を一貫対応、小規模案件をスピーディに納品。</p>
        <p>学習中: Next.js、React Native</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-10 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
        {isSubmitSuccessful && <p className="text-green-600 mb-4">送信ありがとうございます！</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <input {...register('name')} placeholder="名前" className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <input {...register('email')} placeholder="メール" className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <textarea {...register('message')} placeholder="問い合わせ内容" className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.message?.message}</p>

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            送信
          </button>
        </form>
      </section>
    </main>
  );
}
