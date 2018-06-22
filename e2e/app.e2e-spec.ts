import { ConflictFreeMineralsTrackingUIPage } from './app.po';

describe('conflict-free-minerals-tracking-ui App', () => {
  let page: ConflictFreeMineralsTrackingUIPage;

  beforeEach(() => {
    page = new ConflictFreeMineralsTrackingUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
