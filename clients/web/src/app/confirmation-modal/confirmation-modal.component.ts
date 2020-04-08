import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "confirmation-modal",
  templateUrl: "./confirmation-modal.component.html",
  styleUrls: ["./confirmation-modal.component.css"],
})
export class ConfirmationModalComponent implements OnInit {
  @Input("title") title: string;
  @Input("actionName") actionName: string;
  @Input("color") color: string;

  @Output("close") close = new EventEmitter();
  @Output("action") action = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
