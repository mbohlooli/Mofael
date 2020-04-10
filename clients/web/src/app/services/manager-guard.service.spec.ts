import { TestBed } from "@angular/core/testing";

import { ManagerGuard } from "./manager-guard.service";

describe("ManagerGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ManagerGuard = TestBed.get(ManagerGuard);
    expect(service).toBeTruthy();
  });
});
