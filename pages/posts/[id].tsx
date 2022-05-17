import Head from 'next/head';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';

import Date from '../../components/date';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  postData,
}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

type PostPageProps = { postData: PostData };
type PostPageQuery = { id: string };

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageQuery
> = async ({ params }) => {
  const postData = await getPostData(params!.id);
  return { props: { postData } };
};

export default PostPage;
