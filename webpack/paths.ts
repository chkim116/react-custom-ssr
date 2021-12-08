import path from "path";

const CURRENT_WORKING_DIR = process.cwd();

export default {
    app: path.resolve(CURRENT_WORKING_DIR, "src"),
    clientEntry: path.resolve(CURRENT_WORKING_DIR, "./src/index.tsx"),
    serverEntry: path.resolve(CURRENT_WORKING_DIR, "./src/server/server.ts"),
    clientOutput: path.resolve(CURRENT_WORKING_DIR, "dist/client"),
    serverOutput: path.resolve(CURRENT_WORKING_DIR, "dist/server"),
    public: "/app/",
    modules: path.resolve(CURRENT_WORKING_DIR, "node_modules"),
};
