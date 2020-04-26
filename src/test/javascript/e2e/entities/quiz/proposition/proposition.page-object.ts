import { by, element, ElementFinder } from 'protractor';

export class PropositionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proposition div table .btn-danger'));
  title = element.all(by.css('jhi-proposition div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PropositionUpdatePage {
  pageTitle = element(by.id('jhi-proposition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  statementInput = element(by.id('field_statement'));
  validInput = element(by.id('field_valid'));
  explanationInput = element(by.id('field_explanation'));

  questionSelect = element(by.id('field_question'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStatementInput(statement: string): Promise<void> {
    await this.statementInput.sendKeys(statement);
  }

  async getStatementInput(): Promise<string> {
    return await this.statementInput.getAttribute('value');
  }

  getValidInput(): ElementFinder {
    return this.validInput;
  }

  async setExplanationInput(explanation: string): Promise<void> {
    await this.explanationInput.sendKeys(explanation);
  }

  async getExplanationInput(): Promise<string> {
    return await this.explanationInput.getAttribute('value');
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PropositionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proposition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proposition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
