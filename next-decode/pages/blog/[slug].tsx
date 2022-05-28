import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

type BlogPostPageProps = {
  date: string;
};

const BlogPost: NextPage<BlogPostPageProps> = ({ date }) => {
  return <h1>{date}</h1>;
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      date: new Date().toLocaleString(),
    },
    revalidate: 10,
  };
};
