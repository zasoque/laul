import adapter from "@sveltejs/adapter-static";

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: "/laul",
    },
  },
};

export default config;
