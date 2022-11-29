import { Component, OnInit } from "@angular/core";
import { Job } from "../job";
import { JobService } from "../job.service";

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"],
})
export class JobListComponent implements OnInit {
  data: Job[] = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe((data) => (this.data = data));
  }

  handleDownloadClick(filename: string): void {
    this.jobService.downloadResume(filename).subscribe(this.handleFileDownload);
  }

  handleFileDownload(data: Blob): void {
    const blob = new Blob([data], { type: "application/pdf" });
    var downloadURL = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = downloadURL;
    link.download = `${new Date().getTime()}.pdf`;
    link.click();
  }

  handleDelete(id: number): void {
    if (confirm("Are you sure you want to delete the record?")) {
      this.jobService.deleteJob(id).subscribe((res) => this.fetchJobs());
    }
  }

  showDepartment(key: string): string {
    return this.jobService.getDepartmentValue(key);
  }
}
