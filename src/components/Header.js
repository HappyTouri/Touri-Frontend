import { Breadcrumb } from "react-bootstrap";
import { useEffect } from "react";

export default function Header({
  title,
  subTitle1,
  subTitle2,
  dropdown,
  dropdownOptions,
  handelDropdown,
  children,
}) {
  useEffect(() => {
    // if (dropdownOptions.length > 0) {
    //   handleChange(dropdownOptions[0]);
    // }
  }, []);

  const handleChange = (selectedOption) => {
    handelDropdown(selectedOption);
  };

  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header layer3 ">
        <div className="">
          <h2 className="main-content-title tx-24 mg-b-5">{title}</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="#">{subTitle1}</Breadcrumb.Item>
            <Breadcrumb.Item active> {subTitle2}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="">{children}</div>
      </div>
      {/* <!-- End Page Header --> */}
    </>
  );
}
