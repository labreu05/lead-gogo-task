import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { DetailsModal, OrderedList, Paragraph, PostSummary } from "..";
import { getPostComments } from "../../Utils/helpers";
import { Post, Comment } from "../../Utils/types";

type Props = {
  post?: Post;
  visible?: boolean;
  onClose: () => void;
};

export const PostDetailsModal = ({ post, visible = false, onClose }: Props) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    setLoadingComments(true);

    if (post) {
      getPostComments(post)
        .then((comments) => {
          setPostComments(comments);
        })
        .catch((e) => {
          console.error(e);
          message.error("Error: Can't get comments data");
        })
        .finally(() => {
          setLoadingComments(false);
        });
    }
  }, [post]);

  return (
    <DetailsModal
      visible={visible}
      onClose={onClose}
      header={post ? <PostSummary post={post} /> : undefined}
      body={post ? <Paragraph text={post.body} /> : undefined}
      extra={
        <>
          <Skeleton loading={loadingComments}>
            <OrderedList<Comment>
              descriptionKey="body"
              entries={postComments}
              name="Comments"
            />
          </Skeleton>
        </>
      }
    />
  );
};
