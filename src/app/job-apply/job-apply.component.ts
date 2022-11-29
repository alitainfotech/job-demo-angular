import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Department } from "../department";
import { JobService } from "../job.service";

@Component({
  selector: "app-job-apply",
  templateUrl: "./job-apply.component.html",
  styleUrls: ["./job-apply.component.css"],
})
export class JobApplyComponent {
  fileUploaded: string = "";
  constructor(private jobService: JobService, private router: Router) {}
  departments: Department[] = this.jobService.getDepartments();
  applyForm = new FormGroup({
    Name: new FormControl(""),
    Date: new FormControl(""),
    POB: new FormControl(""),
    FilePath: new FormControl({ value: "", disabled: true }),
    Department: new FormControl(""),
  });

  handleFileUpload(target: any): void {
    const formData: FormData = new FormData();
    formData.append("file", target.files[0]);
    this.jobService.uploadResume(formData).subscribe(
      (data) => {
        this.fileUploaded = data;
        this.applyForm.patchValue({ FilePath: data });
      },
      (err) => {
        this.fileUploaded = err.error.text;
        this.applyForm.patchValue({ FilePath: err.error.text });
      }
    );
  }

  onSubmit(): void {
    this.jobService
      .saveJob({ ...this.applyForm.value, FilePath: this.fileUploaded })
      .subscribe(() => this.router.navigate(["/list"]));
  }
}
