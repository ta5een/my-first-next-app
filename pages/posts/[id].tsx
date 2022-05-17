import { NextPage } from "next";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";

type PostProps = { postData: PostData };

const Post: NextPage<PostProps> = ({ postData }) => {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
