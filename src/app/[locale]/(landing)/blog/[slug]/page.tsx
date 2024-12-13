import { notFound } from "next/navigation";

import { blogPosts } from "@/components/module/blogPosts";
import { BlogPost, BlogPostProps } from "@/components/shared/BlogPost/BlogPost";

export default async function BlogPostPage({
	params,
}: {
	params: { slug: string };
}) {
	const post = blogPosts[params.slug];

	if (!post) {
		notFound();
	}

	return (
		<div className="min-h-screen p-6">
			<BlogPost {...post} />
		</div>
	);
}
