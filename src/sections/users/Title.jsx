/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";

function Title() {
  const { t } = useTranslation("translation");

  return (
    <div className="mb-5">
      <strong className="text-3xl mb-2 tracking-[8px] font-bold">
        {t("User Management")}
      </strong>
    </div>
  );
}

export default Title;
