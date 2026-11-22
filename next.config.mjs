import {fileURLToPath} from 'node:url';

export default { output: 'export', trailingSlash: true, poweredByHeader: false, turbopack:{root:fileURLToPath(new URL('.',import.meta.url))} };
