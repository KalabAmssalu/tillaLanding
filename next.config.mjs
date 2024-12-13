/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
	experimental: {
		typedRoutes: false,
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
