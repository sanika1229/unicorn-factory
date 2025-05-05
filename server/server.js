const projectRoutes = require('./routes/projectRoutes');

const app = express(); // make sure app is declared before using it

app.use(cors({
  origin: "https://zingy-taffy-3a8bbc.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

app.use('/api/projects', projectRoutes);
