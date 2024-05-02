import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";

class BetterTraders implements IPostDBLoadMod {
    private logger: ILogger;
    readonly modName = "BetterTraders";

    public postDBLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        const database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig: ITraderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traders = database.traders;

        // Disable Flea Market till lv69
        database.globals.config.RagFair.minUserLevel = 69;
        this.logger.logWithColor(`[${this.modName}]: RAGFAIR DISABLED UNTIL LEVEL ${database.globals.config.RagFair.minUserLevel}.\n`, LogTextColor.RED);
        
        
        // Update Trader Refresh Timers
        traderConfig.updateTime.filter(trader => trader.traderId !== "ragfair").map((trader) => {
            this.logger.logWithColor(`[${this.modName}]: Trader: ${trader?._name}`, LogTextColor.YELLOW); // Log trader name for reference
            this.logger.logWithColor(`[${this.modName}]: Original Min: ${trader.seconds.min} seconds, Original Max: ${trader.seconds.max} seconds`, LogTextColor.GRAY);
            
            trader.seconds.min = Math.floor(Math.random() * (2500 - 1000 + 1)) + 1200;
            trader.seconds.max = trader.seconds.min * 2;
            this.logger.logWithColor(`[${this.modName}]: Updated Min: ${trader.seconds.min} seconds, Updated Max: ${trader.seconds.max} seconds\n`, LogTextColor.WHITE);
        });
        
        const ignoredTraders = ["БТР", "caretaker", "Unknown"] // Ignore these traders when looping through the Traders' configs.

        // Modify and adjust trader reputation requirements and/or minimum spent amount
        for (const trader in traders) {
            const traderID = traders[trader].base;
            if (!ignoredTraders.includes(traderID.nickname)) {
                this.logger.logWithColor(`[${this.modName}]: ### DEBUG ### TRADER NAME: ${traderID.nickname}.`, LogTextColor.GRAY)
                if (traderID.nickname === "Prapor") {
                    const prapor = traderID.loyaltyLevels;

                    prapor.forEach((level, index) => {
                        level.minStanding /= 2;
                        level.minSalesSum *= 1.2;
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Therapist") {
                    const therapist = traderID.loyaltyLevels;

                    therapist.forEach((level, index) => {
                        level.minSalesSum *= 2.85;
                        if (index + 1 === 3) {
                            level.minSalesSum *= 3.05;

                        } else if (index + 1 === 4) {
                            level.minSalesSum *= 3.35;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Fence") {
                    const fence = traderID.loyaltyLevels;

                    fence.forEach((level, index) => {
                        level.minSalesSum *= 1;
                        if (index + 1 === 2) {
                            level.minStanding /= 3;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Skier") {
                    const skier = traderID.loyaltyLevels;

                    skier.forEach((level, index) => {
                        level.minSalesSum *= .95;
                        if (index + 1 === 3) {
                            level.minSalesSum *= 1.2;

                        } else if (index + 1 === 4) {
                            level.minSalesSum *= .95;
                            level.minStanding /= 1.25;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Peacekeeper") {
                    const peacekeeper = traderID.loyaltyLevels;

                    peacekeeper.forEach((level, index) => {
                        level.minSalesSum *= .73;
                        if (index + 1 === 3) {
                            level.minSalesSum *= 1.22;

                        } else if (index + 1 === 4) {
                            level.minSalesSum *= 1.3;
                            level.minStanding /= 1.2;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Mechanic") {
                    const mechanic = traderID.loyaltyLevels;

                    mechanic.forEach((level, index) => {
                        Math.round(level.minSalesSum *= 1.12);
                        if (index + 1 === 3) {
                            Math.round(level.minSalesSum *= 1.2);

                        } else if (index + 1 === 4) {
                            Math.round(level.minSalesSum *= 1.18);
                            level.minStanding /= 1.2;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Ragman") {
                    const ragman = traderID.loyaltyLevels;

                    ragman.forEach((level, index) => {
                        Math.round(level.minSalesSum *= 1.1); //1.15;
                        if (index + 1 === 3) {
                            Math.round(level.minSalesSum *= 1.2);

                        } else if (index + 1 === 4) {
                            Math.round(level.minSalesSum *= 1.3);
                            level.minStanding /= 1//1.2;

                        }
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }

                if (traderID.nickname === "Jaeger") {
                    const jaeger = traderID.loyaltyLevels;

                    jaeger.forEach((level, index) => {
                        level.minStanding = 0;
                        level.minSalesSum *= 2;
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minStanding is now ${level.minStanding}.`, LogTextColor.YELLOW);
                        this.logger.logWithColor(`[${this.modName}]: ${traderID.nickname} - Lv${index + 1}. - minSalesSum is now ${level.minSalesSum}.\n`, LogTextColor.CYAN);
                    });
                }
            }
        }
    }
}

module.exports = { mod: new BetterTraders() }