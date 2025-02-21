import React from "react";

export default function CourseFeatures() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-5">
      {[
        { title: "Batch Start", value: "February 28" },
        {
          title: "Live Class",
          value: "9:00 PM - 10:30 PM (Wed, Sat, Sun)",
        },
        {
          title: "Intern Support",
          value: "16 hours a day, 6 days a week support",
        },
        { title: "Missed Classes", value: "23 classes" },
        { title: "Enrollment Ongoing", value: "In Batch 1024" },
      ].map((item, index) => (
        <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-secondary/70">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-secondary/95">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
