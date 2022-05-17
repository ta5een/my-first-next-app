import { NextPage } from "next";
import Head from "next/head";

import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

type PostProps = { postData: PostData };

const Post: NextPage<PostProps> = ({ postData }) => {
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

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

type PostStaticProps = { params: { id: string } };

export async function getStaticProps({ params }: PostStaticProps) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

export default Post;
