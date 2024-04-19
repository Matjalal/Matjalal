interface ReviewFormProps {
  formColor: string;
}
const ReviewForm: React.FC<ReviewFormProps> = ({ formColor }) => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-3 mx-auto">
        <div className="lg:w-1/1 md:w-3/3 mx-auto">
          {/* 아래 div부터 form 태그로 묶기 */}
          <form className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-lg text-gray-600"
                >
                  Review
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${formColor}-500 focus:bg-white focus:ring-2 focus:ring-${formColor}-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ReviewForm;
