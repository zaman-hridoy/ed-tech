/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_API: "https://stagingapi.simplitaught.com",
    YOUTUBE_BASE_API: "https://www.googleapis.com/youtube/v3",
    YOUTUBE_API_KEY: "AIzaSyBj-rYokduLVcmnlMYl8rBJGjQkVdfK4hY",
    SAMBA_API_TOKEN:
      "M2M5ZTRkMjAtNTBjZi00NjUwLTgxN2EtZGY2ZWNiYTA0M2MzOkw2TnlxOTdFaGxzZFRZZ25DblNBYVBZcDBmMkdDajNSazY4TE1TcTBPVmE4bUtrb2NGb3dWdVl5bEpqdHBxaDk=",
    PICO_ACCESS_KEY: "LPL4AzpETfKY64sA0vCF7t7vckiHEX6ACprWUO5icdpCbrnvrtLVeg==",
    ALAN_SDK_KEY:
      "6b3372ded3eee8b7191b64067b98322c2e956eca572e1d8b807a3e2338fdd0dc/stage",
    SPEECH_KEY: "b68cda92c8a64f4390e4d9ea38585e82",
    SPEECH_REGION: "eastus",

    //FOR STAGING
    STRIPE_PUBLISHABLE_KEY:
      "pk_test_51J1mviCefhDAWSzRJGT9FGY8wdA16WmkT294MPuZPsUeWBoSxz3lcMhMevgpUzPCMPSEeDCk61WWHnvdXexDdnG100cIlmVT5f",
    STRIPE_SECRET_KEY:
      "sk_test_51J1mviCefhDAWSzRD5fcTV0ktb0q7GhPupw1SUebpnuOCX7235bsXj269LaQvgWhrxFeiwpkWGVuUvL6Kv5AbNPa00uP3iGzw3",

    //FOR PROD
    // STRIPE_PUBLISHABLE_KEY:
    //   "pk_live_51HH0YGH0Kg7FQ9JthwHviQQ6WjSDkU0VRRc7oUUCBFNoLvOPUdnAujtTxD803t8xiQlW3KRsG0pkXy1IJt7Li6rJ00LDQNksYd",
    // STRIPE_SECRET_KEY:
  },
  images: {
    // domains: [
    //   "demo-source-1d7wvkkexs6dt.s3.us-west-1.amazonaws.com",
    //   "img.youtube.com",
    //   "dam-st.s3-us-east-2.amazonaws.com",
    //   "covers.vitalbook.com",
    //   "i.ytimg.com",
    //   "images.slideplayer.com",
    //   "slideplayer.com",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo-source-1d7wvkkexs6dt.s3.us-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "dam-st.s3-us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "covers.vitalbook.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.slideplayer.com",
      },
      {
        protocol: "https",
        hostname: "slideplayer.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    config.resolve.alias.canvas = false;
    if (!isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "supports-color": "supports-color",
      });
    }
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

module.exports = nextConfig;
