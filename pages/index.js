// Db
import { connectMongo } from "../db/connectDb";
import Translation from "../db/models/Translation";

// Components
import WritingForm from "../components/Forms/WritingForm";
import SearchPageForm from "../components/Forms/SearchPageForm";
import GetPageData from "../components/Forms/GetPageData";

export default function Home({ data, specificPage }) {
  return (
    <div className="min-h-screen min-w-screen ">
      <main className="flex-col px-20">
        <div className="flex-col flex-center">
          <SearchPageForm data={data} />
          <WritingForm />
          <GetPageData data={specificPage} />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  await connectMongo();

  const { query } = context;

  const page = Object.keys(query)[0];

  const translation = await Translation.find();

  const getSpecificTranslation = await Translation.findOne({ page });

  return {
    props: {
      data: JSON.parse(JSON.stringify(translation)),
      specificPage: JSON.parse(JSON.stringify(getSpecificTranslation)),
    },
  };
}
