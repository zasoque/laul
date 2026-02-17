import adapter from "@sveltejs/adapter-static";
import { Config } from "@sveltejs/kit";

const config: Config = {
  kit: {
    adapter: adapter(),
  },
};

export default config;
