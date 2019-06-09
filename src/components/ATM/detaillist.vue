<template>
  <div class="detailList">
    <b-form @submit="onSubmit">
      <b-row>
        <b-col cols="2">
          <b-button v-on:click="back()" variant="primary">Назад</b-button>
        </b-col>
        <b-col cols="3">
          <b-form-group id="id"
                        label="id"
                        label-for="id"
                        horizontal>
            <b-form-input id="id"
                          type="text"
                          v-model="item.amtName">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="1"></b-col>
        <b-col cols="4">
          <b-form-group id="statusGroup"
                        label="Статус"
                        label-for="status"
                        horizontal>
            <multiselect id="status" v-model="item.status" :options="$store.state.ATMlists.status"
                         :searchable="true"
                         :close-on-select="true" deselect-label="" select-label="" :allow-empty="false"
                         placeholder="Выберите статус"></multiselect>
          </b-form-group>
        </b-col>
      </b-row>
      <div role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block v-b-toggle.dataus variant="primary">Данные о УС</b-btn>
          </b-card-header>
          <b-collapse id="dataus" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col>
                  <b-form-group id="serialNumberGroup"
                                label="Серийный номер"
                                label-for="serialNumber">
                    <b-form-input id="serialNumber"
                                  type="text" class="inputType"
                                  v-model="item.serialNum"
                                  placeholder="Введите серийный номер"
                                  :state="item.serialNum != null && item.serialNum != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="shtrihGroup"
                                label="Штрих-код"
                                label-for="shtrih">
                    <b-form-input id="shtrih"
                                  type="text" class="inputType"
                                  v-model="item.strixCode"
                                  placeholder="Введите штрих-код"
                                  :state="item.strixCode != null && item.strixCode != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="inventoryNumberGroup"
                                label="Инвентарный номер"
                                label-for="inventoryNumber">
                    <b-form-input id="inventoryNumber"
                                  type="text" class="inputType"
                                  v-model="item.inventoryNum"
                                  placeholder="Введите инвентарный номер"
                                  :state="item.inventoryNum != null && item.inventoryNum != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="ATMModel">Модель</label>
                  <multiselect class="ATMModel" v-model="item.model" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите модель"
                               :options="$store.state.ATMlists.data.atmModel" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.model)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <label class="typo__label">Год начала</label>
                  <multiselect v-model="item.year" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите год"
                               :options="$store.state.ATMlists.data.atmDeviceBirthYear"
                               :searchable="false" :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.year)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <label class="typo__label">Кол-во дисплеев</label>
                  <multiselect v-model="item.monitorCount" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Кол-во дисплеев"
                               :options="$store.state.ATMlists.data.atmSpisokColMonitor"
                               :searchable="false"
                               :allow-empty="false" v-bind:style="checkOfEmpty(item.monitorCount)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="startDateGroup"
                                label="Дата ввода в эксплуатацию"
                                label-for="startDate">
                    <date-picker class="datapicker" :class="datePickerValidate(item.startDate)" v-model="item.startDate" lang="ru" format="YYYY-MM-DD" :clearable="false">
                    </date-picker>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="typo__label">Инкассация</label>
                  <multiselect v-model="item.incass" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите инкассацию"
                               :options="$store.state.ATMlists.incass" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.incass)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="telephoneNumberGroup"
                                label="Номер телефона для связи"
                                label-for="telephoneNumber">
                    <b-form-input id="telephoneNumber"
                                  type="text" class="inputType"
                                  v-model="item.contactPhone"
                                  placeholder="Введите номер для связи"
                                  :state="item.contactPhone != null && item.contactPhone != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="ipGroup"
                                label="IP адрес"
                                label-for="ip">
                    <b-input-group>
                      <b-form-input id="ip"
                                    type="text" class="inputType"
                                    v-model="item.ipAddress"
                                    placeholder="Введите IP"
                                    :state="StateIP">
                      </b-form-input>
                      <b-input-group-append>
                        <b-btn class="buttonCopy" :class="checkValidateIp(StateIP)" variant="primary" @click="copyIpWithBuffer()" :state="StateIP"><img src="../../assets/copy.png" height="15"
                                                                               width="15"/></b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col>
                  <label class="typo__label">Модель валидатора</label>
                  <multiselect v-model="item.validatorModel" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите модель валидатора"
                               :options="$store.state.ATMlists.data.atmValidatorModels"
                               :searchable="false" :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.validatorModel)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group id="kassetTypeGroup"
                                label="Тип кассет"
                                label-for="kassetType">
                    <b-form-input id="kassetType"
                                  type="text" class="inputType"
                                  v-model="item.cassetsType"
                                  placeholder="Введите тип кассет"
                                  :state="item.cassetsType != null && item.cassetsType != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <label class="typo__label">Модель чек.принтера</label>
                  <multiselect v-model="item.checkPrinterModel" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите модель чек. принтера"
                               :options="$store.state.ATMlists.data.atmCheckPrinterModel"
                               :searchable="false"
                               :allow-empty="false" v-bind:style="checkOfEmpty(item.checkPrinterModel)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <label class="typo__label">Тип портов</label>
                  <multiselect v-model="item.portType" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите тип портов"
                               :options="$store.state.ATMlists.data.atmPortsType" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.portType)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col v-if="item.biosPassword !== undefined">
                  <b-form-group id="biosPasswordGroup"
                                label="Пароль на BIOS"
                                label-for="biosPassword">
                    <b-form-input id="biosPassword"
                                  type="text" class="inputType"
                                  v-model="item.biosPassword"
                                  placeholder="Введите пароль на BIOS"
                                  :state="item.biosPassword != null && item.biosPassword != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="typo__label">Аутсорсинг</label>
                  <multiselect v-model="item.autCompany" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите аутсорсинговую комп."
                               :options="$store.state.ATMlists.data.atmAutsource" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.autCompany)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="profilacticDateGroup"
                                label="Дата последней профилактики"
                                label-for="profilacticDate">
                    <date-picker class="datapicker" :class="datePickerValidate(item.lastPreventionDate)" v-model="item.lastPreventionDate" lang="ru" format="YYYY-MM-DD" :clearable="false">
                    </date-picker>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <label class="typo__label">
                    Профилактика: <span style="color:red">дней прошло</span> -
                    <span style="color:green">дней осталось</span>
                  </label>
                  <b-progress class="mt-1" :max="max" show-value>
                    <b-progress-bar :value="count" variant="danger"></b-progress-bar>
                    <b-progress-bar :value="max-count" variant="success"></b-progress-bar>
                  </b-progress>
                  <div v-if="max==count">Нужна профилактика!</div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="typo__label">Классификация</label>
                  <multiselect v-model="item.deviceClass" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите тип"
                               :options="$store.state.ATMlists.data.atmClass" :searchable="false"
                               :allow-empty="false" v-bind:style="checkOfEmpty(item.deviceClass)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <label class="currency">Поддерживаемые валюты</label>
                  <multiselect v-model="item.currency" :close-on-select="false" deselect-label=""
                               select-label=""
                               placeholder="Выберите валюты"
                               :options="$store.state.ATMlists.currency" :multiple="true" :taggable="true"
                               v-bind:style="checkOfEmpty(item.currency)"></multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="sellFormatGroup"
                                label="Формат продаж"
                                label-for="sellFormat">
                    <b-form-input id="sellFormat"
                                  type="text" class="inputType"
                                  v-model="item.vspFormatSales.value"
                                  readonly>
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <label class="typo__label">Вид УС</label>
                  <multiselect v-model="item.typeAtm" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите тип"
                               :options="$store.state.ATMlists.data.atmVidUs" :searchable="false"
                               :allow-empty="false" v-bind:style="checkOfEmpty(item.typeAtm)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block v-b-toggle.placeus variant="primary">Расположение</b-btn>
          </b-card-header>
          <b-collapse id="placeus" visible accordion="my-accordion1" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col cols="5">
                  <label class="typo__label">Территориальное управление</label>
                  <multiselect v-model="item.tu" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите ТУ"
                               :options="$store.state.ATMlists.data.tu" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.tu)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col cols="5">
                  <label class="typo__label">Филиал</label>
                  <multiselect v-model="item.filial" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите филиал"
                               :options="$store.state.ATMlists.data.atmSpisokFilial" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.filial)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="punktGroup"
                                label="Населенный пункт"
                                label-for="punkt">
                    <b-form-input id="punkt"
                                  type="text" class="inputType"
                                  v-model="item.city" :state="item.city != null && item.city != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group id="kladrGroup"
                                label="Код КЛАДР"
                                label-for="kladr">
                    <b-form-input id="kladr"
                                  type="text" class="inputType"
                                  v-model="item.kladr" :state="item.kladr != null && item.kladr != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="okatoGroup"
                                label="Код ОКАТО"
                                label-for="okato">
                    <b-form-input id="okato"
                                  type="text" class="inputType"
                                  v-model="item.okato" :state="item.okato != null && item.okato != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <label class="typo__label">Часовой пояс</label>
                  <multiselect v-model="item.timeZone" deselect-label="" select-label=""
                               track-by="value" label="value"
                               placeholder="Выберите часовой пояс"
                               :options="$store.state.ATMlists.data.atmSpisokTimePoint"
                               :searchable="false" :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.timeZone)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="indexGroup"
                                label="Индекс"
                                label-for="index">
                    <b-form-input id="index"
                                  type="text" class="inputType"
                                  v-model="item.index" :state="item.index != null && item.index != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label class="typo__label">Префикс</label>
                  <multiselect v-model="item.vspPreffics" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите префикс"
                               :options="preficsOptions" :searchable="true" :allow-empty="false"
                               @search-change="asyncFindPrefics"
                               :close-on-select="true" :show-no-results="false"
                               v-bind:style="checkOfEmpty(item.vspPreffics)">
                    <template slot="singleLabel" slot-scope="{ option }">
                      {{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <b-form-group id="placeGroup"
                                label="Место"
                                label-for="place">
                    <b-form-input id="place"
                                  type="text" class="inputType"
                                  v-model="item.place" :state="item.place != null && item.place != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="koordsGroup"
                                label="Координаты"
                                label-for="koords">
                    <b-form-input id="koords"
                                  type="text" class="inputType"
                                  v-model="item.coords"
                                  :state="item.coords != null && item.coords != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group id="adressGroup"
                                label="Адрес"
                                label-for="adress">
                    <b-form-textarea id="adress"
                                     v-model="item.address"
                                     placeholder="Введите адрес"
                                     :rows="2"
                                     :max-rows="6" :state="item.address != null && item.address != ''">
                    </b-form-textarea>
                  </b-form-group>
                </b-col>
                <b-col>
                  <label class="typo__label">Тип зоны 1</label>
                  <multiselect v-model="item.typeZoneOne" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите тип зоны"
                               :options="$store.state.ATMlists.data.atmSpTypeZoneOne" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.typeZoneOne)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
                <b-col>
                  <label class="typo__label">Тип зоны 2</label>
                  <multiselect v-model="item.typeZoneTwo" deselect-label="" select-label=""
                               track-by="value" label="value" placeholder="Выберите тип зоны"
                               :options="$store.state.ATMlists.data.atmSpTypeZoneTwo" :searchable="false"
                               :allow-empty="false"
                               v-bind:style="checkOfEmpty(item.typeZoneTwo)">
                    <template slot="singleLabel" slot-scope="{ option }">{{ option.value }}
                    </template>
                  </multiselect>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block v-b-toggle.epp variant="primary">Информация по EPP клавиатуре</b-btn>
          </b-card-header>
          <b-collapse id="epp" accordion="my-accordion2" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col>
                  <b-form-group id="eppModelGroup"
                                label="Модель EPP"
                                label-for="eppModel">
                    <b-form-input id="eppModel"
                                  type="text" class="inputType"
                                  v-model="item.eppModel"
                                  placeholder="Введите модель EPP"
                                  :state="item.eppModel != null && item.eppModel != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="eppSerialNumberGroup"
                                label="Серийный № EPP"
                                label-for="eppSerialNumber">
                    <b-form-input id="eppSerialNumber"
                                  type="text" class="inputType"
                                  v-model="item.eppSerialNum"
                                  placeholder="Введите серийный № EPP"
                                  :state="item.eppSerialNum != null && item.eppSerialNum != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="eppPartionGroup"
                                label="Partion № EPP (for Wincor)"
                                label-for="eppPartion">
                    <b-form-input id="eppPartion"
                                  type="text" class="inputType"
                                  v-model="item.eppPartionNum"
                                  placeholder="Введите partion № EPP (for Wincor)"
                                  :state="item.eppPartionNum != null && item.eppPartionNum != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group id="eppHardwareGroup"
                                label="Hardware EPP"
                                label-for="eppHardware">
                    <b-form-input id="eppHardware"
                                  type="text" class="inputType"
                                  v-model="item.eppHardware"
                                  placeholder="Введите Hardware EPP"
                                  :state="item.eppHardware != null && item.eppHardware != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="eppFirmwareGroup"
                                label="Firmware EPP"
                                label-for="eppFirmware">
                    <b-form-input id="eppFirmware"
                                  type="text" class="inputType"
                                  v-model="item.eppFirmware"
                                  placeholder="Введите Firmware EPP"
                                  :state="item.eppFirmware != null && item.eppFirmware != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col></b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block v-b-toggle.ibp variant="primary">Информация об ИБП</b-btn>
          </b-card-header>
          <b-collapse id="ibp" accordion="my-accordion3" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col cols="3" style="margin: 7px">
                  <b-form-group id="UPSConnected">
                    <b-form-checkbox id="UPSConnectedID" v-model="item.upsConnected">ИБП подключен
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group id="ibpModelGroup"
                                label="Модель ИБП"
                                label-for="ibpModel"
                                horizontal
                                v-if="item.upsConnected">
                    <b-form-input id="ibpModel"
                                  type="text"
                                  v-model="item.upsModel"
                                  placeholder="Введите модель ИБП"
                                  :state="item.upsModel != null && item.upsModel != ''">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block v-b-toggle.regim variant="primary">Режим работы</b-btn>
          </b-card-header>
          <b-collapse id="regim" accordion="my-accordion4" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col cols="3"></b-col>
                <b-col cols="6">
                  <b-form-group id="workingGroup"
                                label="Режим работы"
                                label-for="working"
                                horizontal>
                    <multiselect id="working" v-model="regim.working"
                                 :options="$store.state.ATMlists.working"
                                 :searchable="true"
                                 :close-on-select="true" deselect-label="" select-label=""
                                 :allow-empty="false"
                                 placeholder="Выберите режим работы"></multiselect>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="4" v-if="regim.working != 'Круглосуточно' && regim.working != ''"
                       style="text-align: center">
                  <b-card class="workingTime">
                    <h3>Будние дни</h3>
                    <b-row>
                      <b-col>
                        <b-form inline>
                          <label class="mr-1 workLabel1">C</label>
                          <b-input class="mr-1" id="inName" min="0" max="24" type="number"
                                   v-model="regim.workStartHour"></b-input>
                          <label class="mr-1 workLabel1">до</label>
                          <b-input class="mr-1" id="inSurname" min="0" max="24" type="number"
                                   v-model="regim.workEndHour"></b-input>
                        </b-form>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col cols="4" v-if="regim.working == 'Шестидневка' || regim.working == 'Семидневка'"
                       style="text-align: center">
                  <b-card class="workingTime">
                    <h3>Суббота</h3>
                    <b-row>
                      <b-col>
                        <b-form inline>
                          <label class="mr-1 workLabel1">C</label>
                          <b-input class="mr-1" id="inName" min="0" max="24" type="number"
                                   v-model="regim.satStartHour"></b-input>
                          <label class="mr-1 workLabel1">до</label>
                          <b-input class="mr-1" id="inSurname" min="0" max="24" type="number"
                                   v-model="regim.satEndHour"></b-input>
                        </b-form>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col cols="4" v-if="regim.working == 'Семидневка'" style="text-align: center">
                  <b-card class="workingTime">
                    <h3>Воскресенье</h3>
                    <b-row>
                      <b-col>
                        <b-form inline>
                          <label class="mr-1 workLabel1">C</label>
                          <b-input class="mr-1" id="inName" min="0" max="24" type="number"
                                   v-model="regim.sunStartHour"></b-input>
                          <label class="mr-1 workLabel1">до</label>
                          <b-input class="mr-1" id="inSurname" min="0" max="24" type="number"
                                   v-model="regim.sunEndHour"></b-input>
                        </b-form>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <b-modal ref="myModalSave" hide-header no-close-on-esc no-close-on-backdrop hide-footer title="Message">
        <div class="d-block text-center">
          <h3>{{errorLoadMessage}}</h3>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-btn>
      </b-modal>
      <b-modal ref="myModalErrorIP" hide-footer title="Что-то пошло не так">
        <div class="d-block text-center">
          <h3>{{errorPageMessage}}</h3>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="closeModal">Закрыть</b-btn>
      </b-modal>
      <b-row>
        <b-col cols="6"></b-col>
        <b-col cols="6">
          <b-button type="submit" variant="primary" style="float: right">Сохранить</b-button>
        </b-col>
      </b-row>
      <br>
    </b-form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
const axios = require('axios')

export default {
  name: 'detaillist',
  data: function () {
    return {
      item: {},
      preficsOptions: [],
      errorPageMessage: '',
      errorLoadMessage: '',
      regim: {
        working: '',
        workStartHour: '0',
        workEndHour: '0',
        satStartHour: '0',
        satEndHour: '0',
        sunStartHour: '0',
        sunEndHour: '0'
      }
    }
  },
  components: {
    DatePicker
  },
  computed: {
    count: function () {
      var d0 = new Date(this.item.lastPreventionDate)
      var d1 = new Date()
      var n = (d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24)
      if (Math.floor(n) > this.max) {
        n = this.max
      }
      return Math.floor(n)
    },
    max: function () {
      var d0 = new Date(this.item.lastPreventionDate)
      var d1 = new Date(this.item.lastPreventionDate)
      d1.setMonth(d1.getMonth() + 5)
      var n = (d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24)
      return Math.floor(n)
    },
    StateIP: function () {
      if (this.item.ipAddress == null || this.item.ipAddress === '') {
        return false
      } else
      // eslint-disable-next-line
      if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(this.item.ipAddress)) {
        return true
      } else return false
    }
  },
  mounted () {
    // загружаем данные, когда представление создано
    // и данные реактивно отслеживаются
    if (this.$store.state.ATMlists.data.atmModel.length === 0) {
      this.$store.dispatch('getATMLists')
    }
    this.getFullAtmInfo()
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.StateIP || this.item.ipAddress.length === 0) {
        this.errorLoadMessage = 'Изменения сохранены'
        this.$refs.myModalSave.show()
      } else {
        this.errorPageMessage = 'Введен неверный IP адрес!!!'
        this.$refs.myModalErrorIP.show()
      }
    },
    hideModal () {
      this.$refs.myModalSave.hide()
      this.$router.push({path: '/'})
    },
    closeModal () {
      this.$refs.myModalErrorIP.hide()
    },
    back: function () {
      this.$router.push({name: 'shortList'})
    },
    asyncFindPrefics (query) {
      if (query.length > 3) {
        let url = this.$store.state.baseUrl + 'api/System/FindDivisionByTitle'
        axios.get(url, {params: {title: query}}
        ).then(
          response => (this.lists.preficsOptions = response.data.message)
        ).catch(function (error) {
          alert(error)
        })
      } else if (query.length < 4) {
        this.lists.prefics = []
      }
    },
    checkValidateIp (state) {
      if (state) {
        return 'greenBorderColor'
      } else return 'redBorderColor'
    },
    checkOfEmpty (param) {
      if (param == null || param.key === '') {
        return {border: '1px solid #dc3545', 'border-radius': '5px'}
      } else return {border: '1px solid #28a745', 'border-radius': '5px'}
    },
    getFullAtmInfo () {
      this.$store.commit('showPreloader')
      this.$store.commit('updateToken')
      axios.get(this.$store.state.baseUrl + 'api/ATMDevices/GetATMInfo', {
        params: {
          ATMId: this.$route.params.id
        },
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
      ).then(response => {
        this.$store.commit('hidePreloader')
        if (response.data.status === 0) {
          alert(response.data.errorMessage)
          return
        }
        this.item = JSON.parse(response.data.message)
      }).catch(error => {
        this.$store.commit('hidePreloader')
        if (error.response !== undefined) {
          if (error.response.data.message === 'Authorization has been denied for this request.') {
            this.$store.commit('previusURL')
            this.$router.push({name: 'Auth'})
          } else {
            alert(error.response.data.message + '\n' + error.response.data.errorMessage)
          }
        } else {
          alert(error.message)
        }
      })
    },
    copyIpWithBuffer () {
      let tmp = document.createElement('INPUT')
      let focus = document.activeElement
      tmp.value = this.item.ipAddress
      document.body.appendChild(tmp)
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
      focus.focus()
    },
    datePickerValidate (date) {
      if (date === null || date.length === 0) {
        return 'datePickerValid'
      } else return 'datePickerInvalid'
    }
  },
  watch: {
    '$route.params.id' (to, from) {
      if (this.$route.params.id != null) {
        this.getFullAtmInfo()
      }
    }
  }
}
</script>

<style scoped>
  .workingTime .form-inline .form-control {
    width: 60px;
  }
  .workLabel1 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-datepicker {
    width: 100%;
    padding: 0px;
  }
</style>
<style>
  .detailList .btn-primary {
    border-color: #004997;
    background-color: #004997;
  }
  .detailList .buttonCopy {
    background-color: white;
  }
  .detailList .buttonCopy:active{
    background-color: #c9c9c9 !important;
    border-color: #c9c9c9 !important;
  }
  .detailList .buttonCopy:active:focus{
    box-shadow: 0 0 0 0.2rem rgba(201, 201, 201, 0.5) !important;
  }
  .detailList .redBorderColor {
    border: 1px solid #dc3545;
    border-left: none;
  }
  .detailList .greenBorderColor {
    border: 1px solid #28a745;
    border-left: none;
  }
  .detailList .multiselect__option{
    white-space: normal;
  }
  .detailList .multiselect__tag{
    background-color: #004997;
  }
  .detailList .multiselect__option--highlight{
    background-color: #004997;
  }
  .detailList .multiselect__tag-icon:after {
    color: white;
  }
  .detailList .custom-checkbox .custom-control-input:checked~.custom-control-label::before{
    background: white;
    background-color: #004997;
    border: none;
  }
  .detailList .custom-control-input:checked~.custom-control-label::before{
    background-color: #004997;
  }
  .detailList #statusGroup .multiselect__tags,.detailList #workingGroup .multiselect__tags {
    border: 1px solid #ced4da;
  }
  .detailList .multiselect__tags {
    border: none;
    min-height: 40px;
  }
  .detailList .multiselect__content-wrapper .multiselect__content li:last-child {
    display: none;
  }
  .detailList .inputType, .detailList #workingGroup .multiselect__tags {
    min-height: 43px;
  }
  .detailList .custom-control-label::before{
    border:1px solid rgba(46, 46, 46, 0.63);
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }
  .mx-input {
    min-height: 42px;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    padding-clip: padding-box;
    border-radius: 0.25rem;
  }
  .datePickerValid input {
    border: 1px solid #dc3545;
  }
  .datePickerInvalid input {
    border: 1px solid #28a745;
  }
</style>
