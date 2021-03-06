import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Date from '../components/date';
import Layout, { SITE_TITLE } from '../components/layout';
import { getSortedPostsData, PostData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  allPostsData,
}) => {
  return (
    <Layout home>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className={utilStyles.listItem}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

type HomePageStaticProps = {
  allPostsData: PostData[];
};

export const getStaticProps: GetStaticProps<HomePageStaticProps> = () => {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
};

export default HomePage;
