const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-700">সাইন ইন</h2>
      <form>
        <fieldset className="fieldset rounded-box w-md ">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4 bg-red-700 text-white ">
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
